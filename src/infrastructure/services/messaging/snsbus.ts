var AWS = require("aws-sdk");
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { ConfigService } from "@nestjs/config";
import { IMessaging } from "src/domain/common/interfaces/imessaging";

export class SNSBus implements IMessaging {
    private _region: string;
    private _queueUrl: string;

    constructor(
        private configService: ConfigService,
    ) {
        // this._region = this.configService.get<string>('REGION');
        // this._queueUrl = this.configService.get<string>('SQS_QUEUE_URL');

        // Set the region
        //AWS.config.update({ region: "REGION" });
        AWS.config.update({ region: "us-east-1" });
    }

    async publish(payload: any): Promise<any> {
        // The AWS Region can be provided here using the `region` property. If you leave it blank
        // the SDK will default to the region set in your AWS config.
        const snsClient = new SNSClient({});

        const response = await snsClient.send(
            new PublishCommand({
                Message: JSON.stringify(payload),
                TopicArn: "arn:aws:sns:us-east-1:900534935988:ClienteRegistrado",
            }),
        );
        console.log(response);

        // {
        //   '$metadata': {
        //     httpStatusCode: 200,
        //     requestId: 'e7f77526-e295-5325-9ee4-281a43ad1f05',
        //     extendedRequestId: undefined,
        //     cfId: undefined,
        //     attempts: 1,
        //     totalRetryDelay: 0
        //   },
        //   MessageId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        // }

        return response;

    }
}
