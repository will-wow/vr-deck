defmodule VrDeck.Repo do
  use Ecto.Repo,
    otp_app: :vr_deck,
    adapter: Ecto.Adapters.Postgres
end
