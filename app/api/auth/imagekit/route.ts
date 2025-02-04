import config from "@/lib/confing"
import ImageKit from "imagekit"
import { NextResponse } from "next/server"


const {env: {imagekit: {privateKey, publicKey, urlEndpoint}}} = config

const imageKit = new ImageKit({ publicKey, privateKey, urlEndpoint })


export async function GET() {
    return NextResponse.json(imageKit.getAuthenticationParameters())
}