defmodule DemoChat.PageController do
  use DemoChat.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
