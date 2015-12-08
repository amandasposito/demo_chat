defmodule DemoChat.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", message, socket) do
    {:ok, socket}
  end

  def handle_in("new:message", msg, socket) do
    broadcast! socket, "new:message", %{user: msg["user"], body: msg["body"]}
    {:noreply, socket}
  end
end
