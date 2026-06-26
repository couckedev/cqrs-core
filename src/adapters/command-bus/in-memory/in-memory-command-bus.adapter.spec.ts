import { describe, expect, it } from "vitest";
import {
  CommandAlreadySubscribedError,
  CommandNotSubscribedError,
} from "../../../errors/index.js";
import type { Command, ICommandHandler } from "../../../types/index.js";
import { InMemoryCommandBus } from "./in-memory-command-bus.adapter.js";

describe("In memory command bus adapter", () => {
  describe("subscribe", () => {
    it("should throw error if command is already handled", () => {
      const commandBus = new InMemoryCommandBus();
      const handler = {
        execute: async () => {},
      } as ICommandHandler<Command>;
      commandBus.subscribe("Command", handler);

      const invalidSubscription = () =>
        commandBus.subscribe("Command", handler);

      expect(invalidSubscription).toThrow(
        new CommandAlreadySubscribedError("Command"),
      );
    });
  });
  describe("execute", () => {
    it("should dispatch command on bus and execute its handler", () => {
      const commandBus = new InMemoryCommandBus();
      let executedHandler = false;
      let executedCommand: Command | null = null;
      const handler = {
        execute: async (command: Command) => {
          executedHandler = true;
          executedCommand = command;
        },
      } as ICommandHandler<Command>;
      const command: Command = {
        name: "Command",
      };
      commandBus.subscribe(command.name, handler);

      commandBus.execute(command);

      expect(executedHandler).toBeTruthy();
      expect(executedCommand).toStrictEqual(command);
    });

    it("should throw error if command is not subscribed", () => {
      const commandBus = new InMemoryCommandBus();
      const command: Command = {
        name: "Command",
      };

      const execution = () => commandBus.execute(command);

      expect(execution).toThrow(new CommandNotSubscribedError(command.name));
    });
  });
});
