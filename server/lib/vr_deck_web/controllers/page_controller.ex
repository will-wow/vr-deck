defmodule VrDeckWeb.PageController do
  use VrDeckWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
