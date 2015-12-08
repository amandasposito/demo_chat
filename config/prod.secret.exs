use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :demo_chat, DemoChat.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [host: "papo-reto-demo-chat.herokuapp.com", port: 80],
  cache_static_manifest: "priv/static/manifest.json",
  secret_key_base: System.get_env("SECRET_KEY_BASE")

Configure your database
config :demo_chat, DemoChat.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DATABASE_USERNAME"),
  password: System.get_env("DATABASE_PASSWORD"),
  database: "demo_chat_prod",
  pool_size: 20
