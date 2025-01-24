import { S3Client } from "@aws-sdk/client-s3";
import { AssumeRoleCommand, STSClient  } from "@aws-sdk/client-sts";

async function s3_client(roleArn, region) {
    const client = new STSClient({ region: 'us-east-2' });

    try {
        
        const command = new AssumeRoleCommand({
            // The Amazon Resource Name (ARN) of the role to assume.
            RoleArn: roleArn,
            // An identifier for the assumed role session.
            RoleSessionName: "S3ClientSession",
            // The duration, in seconds, of the role session. The value specified
            // can range from 900 seconds (15 minutes) up to the maximum session
            // duration set for the role.
            DurationSeconds: 900,
          });

        const response = await client.send(command);

        const { AccessKeyId, SecretAccessKey, SessionToken } = response.Credentials;

        // Create Client with temporary creds
        const s3_client = new S3Client({
            region: region,
            accessKeyId: AccessKeyId,
            secretAccessKey: SecretAccessKey,
            sessionToken: SessionToken,
        });

        return s3_client
    } catch (error) {
        throw new Error(`Failed to assume role: ${error.message}`);
    }
}

export default s3_client