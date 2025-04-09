"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card/Card"
import { Button } from "../../components/ui/Button/Button"
import { Facebook } from "lucide-react"

function FacebookLogin() {
    const [sessionInfoResponse, setSessionInfoResponse] = useState("")
    const [sdkResponse, setSDKResponse] = useState("")

    // Initialize Facebook SDK
    useEffect(() => {
        // Add Facebook SDK
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: "521542760988626",
                autoLogAppEvents: true,
                xfbml: true,
                version: "v22.0",
            })
        }

        // Load the SDK
        const loadFacebookSDK = () => {
            const script = document.createElement("script")
            script.src = "https://connect.facebook.net/en_US/sdk.js"
            script.async = true
            script.defer = true
            script.crossOrigin = "anonymous"
            document.body.appendChild(script)
        }

        // Create div for FB root if it doesn't exist
        if (!document.getElementById("fb-root")) {
            const fbRoot = document.createElement("div")
            fbRoot.id = "fb-root"
            document.body.appendChild(fbRoot)
        }

        loadFacebookSDK()

        // Add event listener for messages from Facebook
        const handleMessage = (event) => {
            if (event.origin !== "https://www.facebook.com" && event.origin !== "https://web.facebook.com") {
                return
            }
            try {
                const data = JSON.parse(event.data)
                if (data.type === "WA_EMBEDDED_SIGNUP") {
                    // if user finishes the Embedded Signup flow
                    if (data.event === "FINISH") {
                        const { phone_number_id, waba_id } = data.data
                        console.log("Phone number ID ", phone_number_id, " WhatsApp business account ID ", waba_id)
                        // if user cancels the Embedded Signup flow
                    } else if (data.event === "CANCEL") {
                        const { current_step } = data.data
                        console.warn("Cancel at ", current_step)
                        // if user reports an error during the Embedded Signup flow
                    } else if (data.event === "ERROR") {
                        const { error_message } = data.data
                        console.error("error ", error_message)
                    }
                }
                setSessionInfoResponse(JSON.stringify(data, null, 2))
            } catch (error) {
                console.log("Non JSON Responses", event.data)
            }
        }

        window.addEventListener("message", handleMessage)

        // Cleanup
        return () => {
            window.removeEventListener("message", handleMessage)
        }
    }, [])

    // Facebook login callback
    const fbLoginCallback = (response) => {
        if (response.authResponse) {
            const code = response.authResponse.code
            // The returned code must be transmitted to your backend first and then
            // perform a server-to-server call from there to our servers for an access token.
        }
        setSDKResponse(JSON.stringify(response, null, 2))
    }

    // Launch WhatsApp signup
    const launchWhatsAppSignup = () => {
        if (window.FB) {
            // Launch Facebook login
            window.FB.login(fbLoginCallback, {
                config_id: "579473541780135", // configuration ID goes here
                response_type: "code", // must be set to 'code' for System User access token
                override_default_response_type: true, // when true, any response types passed in the "response_type" will take precedence over the default types
                extras: {
                    setup: {},
                    featureType: "",
                    sessionInfoVersion: "2",
                },
            })
        } else {
            console.error("Facebook SDK not loaded yet")
        }
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Meta Onboarding</h1>

            </div>

            <Card className="card-hover">
                <CardHeader>
                    <CardTitle>Facebook Login</CardTitle>
                    <CardDescription>Connect your Facebook account to access WhatsApp Business API features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col items-center justify-center gap-4 p-6">
                        <Button onClick={launchWhatsAppSignup} className="bg-[#1877f2] hover:bg-[#1877f2]/90 text-white">
                            <Facebook className="mr-2 h-4 w-4" />
                            Login with Facebook
                        </Button>

                        <div className="w-full mt-8">
                            <h3 className="text-lg font-medium mb-2">Session info response:</h3>
                            <div className="bg-muted p-4 rounded-md overflow-auto max-h-60">
                                <pre className="text-sm">{sessionInfoResponse || "No response yet"}</pre>
                            </div>
                        </div>

                        <div className="w-full mt-4">
                            <h3 className="text-lg font-medium mb-2">SDK response:</h3>
                            <div className="bg-muted p-4 rounded-md overflow-auto max-h-60">
                                <pre className="text-sm">{sdkResponse || "No response yet"}</pre>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FacebookLogin
