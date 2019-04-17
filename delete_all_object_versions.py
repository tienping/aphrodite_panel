import boto3
session = boto3.Session()
s3 = session.resource(service_name='s3')
bucket = s3.Bucket('aphrodite.hermo.my')
bucket.object_versions.delete()
# bucket.delete()