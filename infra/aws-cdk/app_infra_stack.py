from aws_cdk import (
    Stack,
    CfnOutput,
    aws_s3 as s3,
    aws_s3_deployment as s3deploy,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    aws_ecr_assets as ecr_assets,
    aws_apprunner_alpha as apprunner,
)

from aws_cdk.aws_apprunner_alpha import ImageConfiguration
from constructs import Construct

class AppInfraStack(Stack):
    def __init__(self, scope: Construct, id: str, **kwargs):
        super().__init__(scope, id, **kwargs)

        site_bucket = s3.Bucket(self, "FrontendBucket",
            website_index_document="index.html",
            public_read_access=True,
            block_public_access=s3.BlockPublicAccess.BLOCK_ACLS
        )

        s3deploy.BucketDeployment(self, "DeployFrontend",
            sources=[s3deploy.Source.asset("../frontend/dist")],
            destination_bucket=site_bucket
        )

        distribution = cloudfront.Distribution(self, "FrontendCDN",
            default_behavior={
                "origin": origins.S3Origin(site_bucket),
                "viewer_protocol_policy": cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
            }
        )

        ### ⚙️ BACKEND (Docker → ECR → App Runner) ###

        # Build and push Docker image to ECR
        backend_image_asset = ecr_assets.DockerImageAsset(self, "BackendImage",
            directory="../backend"
        )

        # App Runner service using the ECR image
        app_runner_service = apprunner.Service(self, "AppRunnerService",
            source=apprunner.Source.from_ecr(
                repository=backend_image_asset.repository,
                tag_or_digest=backend_image_asset.image_uri.split(":")[-1],
                image_configuration=ImageConfiguration(port=8000)
            )
        )

        # Grant permission to App Runner to pull from ECR
        backend_image_asset.repository.grant_pull(app_runner_service.grant_principal)



        ### 📤 OUTPUTS ###

        CfnOutput(self, "FrontendURL", value=f"https://{distribution.domain_name}")
        CfnOutput(self, "BackendURL", value=app_runner_service.service_url)
