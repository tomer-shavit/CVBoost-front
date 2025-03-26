import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    // Extract the Lambda endpoint from environment variables
    const lambdaEndpoint =
      process.env.BOOST_FUNC_API || process.env.NEXT_PUBLIC_BOOST_FUNC_API;
    console.log("Lambda endpoint:", lambdaEndpoint);

    if (!lambdaEndpoint) {
      console.error("Lambda endpoint configuration is missing");
      return NextResponse.json(
        { error: "Lambda endpoint configuration is missing" },
        { status: 500 },
      );
    }

    // Get the request body
    const body = await request.json();
    console.log("Request body received (userId):", body.userId);
    console.log("Request body contains resume data:", !!body.resume);

    // Forward the request to Lambda with the proper headers
    try {
      const response = await axios.post(lambdaEndpoint, body, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 60000, // 60 second timeout
      });

      console.log("Received response from Lambda:", {
        status: response.status,
        statusText: response.statusText,
        hasData: !!response.data,
      });

      // Check if response is in the expected format with statusCode and body
      if (response.data && response.data.statusCode && response.data.body) {
        console.log("Lambda returned a wrapped response format");

        // Parse the body if it's a string
        let lambdaResponseBody;
        if (typeof response.data.body === "string") {
          try {
            lambdaResponseBody = JSON.parse(response.data.body);
            console.log("Successfully parsed Lambda response body from string");
          } catch (parseError) {
            console.error("Error parsing Lambda response body:", parseError);
            lambdaResponseBody = response.data.body;
          }
        } else {
          lambdaResponseBody = response.data.body;
        }

        // Return the processed response body
        return NextResponse.json(lambdaResponseBody, {
          status: response.data.statusCode,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      // If response is not in the expected format, return it as-is
      return NextResponse.json(response.data, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (axiosError) {
      console.error("Axios error details:", {
        message: axiosError.message,
        code: axiosError.code,
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
      });
      throw axiosError;
    }
  } catch (error) {
    console.error("Error proxying request to Lambda:", error);

    // Handle error response from Lambda
    if (axios.isAxiosError(error) && error.response) {
      console.error("Lambda error response:", {
        status: error.response.status,
        statusText: error.response.statusText,
      });

      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    // Handle network errors (like ECONNREFUSED, ETIMEDOUT, etc.)
    if (axios.isAxiosError(error) && !error.response) {
      console.error("Network error details:", {
        message: error.message,
        code: error.code,
      });

      return NextResponse.json(
        {
          error: "Connection to resume analysis service failed",
          details: `Network error: ${error.message}`,
          code: error.code,
        },
        { status: 503 },
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: "An error occurred while processing your request",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
