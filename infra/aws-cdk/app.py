from aws_cdk import core
from aws_cdk.aws_lambda import Function, Runtime, Code
from aws_cdk.aws_apigateway import LambdaRestApi
from aws_cdk.aws_s3 import Bucket
from aws_cdk.aws_s3_deployment import BucketDeployment
from aws_cdk.aws_iam import Role, ServicePrincipal, PolicyStatement

class AudioCallingAppStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # Create an S3 bucket for the frontend
        frontend_bucket = Bucket(self, "FrontendBucket",
                                 website_index_document="index.html",
                                 public_read_access=True)

        # Create a Lambda function for the backend
        backend_lambda_role = Role(self, "BackendLambdaRole",
                                    assumed_by=ServicePrincipal("lambda.amazonaws.com"),
                                    inline_policies={
                                        "LambdaPolicy": PolicyStatement(
                                            actions=["logs:*"],
                                            resources=["*"]
                                        )
                                    })

        backend_function = Function(self, "BackendFunction",
                                    runtime=Runtime.PYTHON_3_8,
                                    handler="app.handler",
                                    code=Code.from_asset("backend/src"),
                                    environment={
                                        "BUCKET_NAME": frontend_bucket.bucket_name
                                    },
                                    role=backend_lambda_role)

        # Create an API Gateway for the Lambda function
        api = LambdaRestApi(self, "AudioCallingApi",
                            handler=backend_function)

        # Deploy the frontend to the S3 bucket
        BucketDeployment(self, "DeployFrontend",
                         sources=[Source.asset("frontend/public")],
                         destination_bucket=frontend_bucket)

app = core.App()
AudioCallingAppStack(app, "AudioCallingAppStack")
app.synth()