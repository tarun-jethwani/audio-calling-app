from aws_cdk import App
from app_infra_stack import AppInfraStack

app = App()
AppInfraStack(app, "AudioCallingAppStack")
app.synth()