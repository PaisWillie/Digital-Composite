import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { AssumeRoleCommand, STSClient  } from "@aws-sdk/client-sts";

async function dynamodb_client(roleArn, region) {
    const client = new STSClient({ region: 'us-east-2' });

    try {
        
        const command = new AssumeRoleCommand({
            // The Amazon Resource Name (ARN) of the role to assume.
            RoleArn: roleArn,
            // An identifier for the assumed role session.
            RoleSessionName: "DDBSession",
            // The duration, in seconds, of the role session. The value specified
            // can range from 900 seconds (15 minutes) up to the maximum session
            // duration set for the role.
            DurationSeconds: 900,
          });

        const response = await client.send(command);

        const { AccessKeyId, SecretAccessKey, SessionToken } = response.Credentials;

        // Create Client with temporary creds
        const dynamodb_client = new DynamoDBClient({
            region: region,
            accessKeyId: AccessKeyId,
            secretAccessKey: SecretAccessKey,
            sessionToken: SessionToken,
        });

        return dynamodb_client
    } catch (error) {
        throw new Error(`Failed to assume role: ${error.message}`);
    }
}

export default dynamodb_client