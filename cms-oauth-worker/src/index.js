export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    if (pathname === "/auth") {
      const redirectUri = `${url.origin}/callback`;
      const state = crypto.randomUUID();

      const authUrl = new URL("https://github.com/login/oauth/authorize");
      authUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set("redirect_uri", redirectUri);
      authUrl.searchParams.set("scope", "repo,user");
      authUrl.searchParams.set("state", state);

      return Response.redirect(authUrl.toString(), 302);
    }

    if (pathname === "/callback") {
      const code = searchParams.get("code");
      if (!code) {
        return new Response("Missing code", { status: 400 });
      }

      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const tokenData = await tokenRes.json();

      if (tokenData.error || !tokenData.access_token) {
        return new Response(renderCallbackHtml("error", { message: tokenData.error_description || "OAuth failed" }), {
          headers: { "Content-Type": "text/html" },
        });
      }

      return new Response(renderCallbackHtml("success", { token: tokenData.access_token }), {
        headers: { "Content-Type": "text/html" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};

function renderCallbackHtml(status, payload) {
  const message =
    status === "success"
      ? `authorization:github:success:${JSON.stringify({ token: payload.token, provider: "github" })}`
      : `authorization:github:error:${JSON.stringify({ message: payload.message })}`;

  return `<!DOCTYPE html>
<html>
  <body>
    <script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(
            ${JSON.stringify(message)},
            e.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`;
}
