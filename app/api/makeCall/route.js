import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST() {
  try {
    const call = await client.calls.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      // Trial: $14.2372
      // Trial: $14.1996     
      // Trial: $14.162 
      to: "+919400100423",
      url: "http://demo.twilio.com/docs/voice.xml",
      // url: "http://demo.twilio.com/docs/classic.mp3",  never gonna give u up
    });

    return NextResponse.json({ sid: call.sid }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
