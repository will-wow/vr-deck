# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :vr_deck,
  ecto_repos: [VrDeck.Repo]

# Configures the endpoint
config :vr_deck, VrDeckWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "1hgBu6nfkLfLgeZRKpYaJFhJ8m3xBmHCNt49/ccfgtxHbP8fitUplpVqzOngpuX/",
  render_errors: [view: VrDeckWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: VrDeck.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "q1e6McSz"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
