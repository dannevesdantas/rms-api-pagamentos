var AWS = require("aws-sdk");
import { ConfigService } from "@nestjs/config";
import { IMessaging } from "src/domain/common/interfaces/imessaging";

export class SQSBus implements IMessaging {
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

    async publish(payload: any) {
        // Create an SQS service object
        var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

        var params = {
            // Remove DelaySeconds parameter and value for FIFO queues
            DelaySeconds: 10,
            MessageAttributes: {
                Title: {
                    DataType: "String",
                    StringValue: "The Whistler",
                },
                Author: {
                    DataType: "String",
                    StringValue: "John Grisham",
                },
                WeeksOn: {
                    DataType: "Number",
                    StringValue: "6",
                },
            },
            //MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
            MessageBody: JSON.stringify(payload),
            // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
            // MessageGroupId: "Group1",  // Required for FIFO queues
            //QueueUrl: "SQS_QUEUE_URL",
            QueueUrl: "https://sqs.us-east-1.amazonaws.com/900534935988/teste",
        };

        sqs.sendMessage(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.MessageId);
            }
        });

    }
}
