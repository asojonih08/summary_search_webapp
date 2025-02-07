"use server";
import {
  LambdaClient,
  InvokeWithResponseStreamCommand,
  InvokeWithResponseStreamCommandInput,
} from "@aws-sdk/client-lambda";

// Initialize the Lambda client
const lambda = new LambdaClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

function Decodeuint8arr(uint8array: Uint8Array) {
  return new TextDecoder("utf-8").decode(uint8array);
}

export async function* fetchChatStream(
  searchQuery: string,
  searchResultsItems: []
) {
  console.log("fetchChatStream lib called");
  const input: InvokeWithResponseStreamCommandInput = {
    FunctionName: "summarizeHandler-fb03d7c",
    InvocationType: "RequestResponse" as const,
    LogType: "None",
    Payload: new TextEncoder().encode(
      JSON.stringify({ searchQuery, searchResultsItems })
    ),
  };

  try {
    const command = new InvokeWithResponseStreamCommand(input);
    const response = await lambda.send(command);

    if (response.StatusCode !== 200) {
      throw new Error(
        `Lambda invocation failed with status code ${response.StatusCode}`
      );
    }

    const events = response.EventStream;
    if (!events) {
      throw new Error("Lambda response does not contain an event stream.");
    }

    for await (const event of events) {
      // console.log(event);

      // `PayloadChunk`: These contain the actual raw bytes of the chunk
      // It has a single property: `Payload`
      if (event.PayloadChunk) {
        // Decode the raw bytes into a string a human can read
        let decodedPayload;
        if (event.PayloadChunk.Payload) {
          decodedPayload = Decodeuint8arr(event.PayloadChunk.Payload);
          //   console.log("Decode Payload: ", decodedPayload);
          yield decodedPayload;
        }
      }

      // `InvokeComplete`: This event is sent when the function is done streaming.
      // It has the following properties:
      // `LogResult`: Contains the last 4KiB of execution logs as a base64 encoded
      //     string when Tail Logs are enabled.
      // `ErrorCode`: The error code if the function ran into an error mid-stream.
      // `ErrorDetails`: Additional details about the error if the function ran into
      //     an error mid-stream.
      if (event.InvokeComplete) {
        if (event.InvokeComplete.ErrorCode) {
          console.log("Error Code:", event.InvokeComplete.ErrorCode);
          console.log("Details:", event.InvokeComplete.ErrorDetails);
        }

        if (event.InvokeComplete.LogResult) {
          const buff = Buffer.from(event.InvokeComplete.LogResult, "base64");
          console.log("Logs:", buff.toString("utf-8"));
        }
      }
    }
  } catch (err) {
    console.log("Error", err);
  }
}
