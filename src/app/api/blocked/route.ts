export async function GET() {
  return new Response(
    JSON.stringify({ error: "Access denied for this user agent." }),
    {
      status: 403,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=300",
      },
    }
  );
}
