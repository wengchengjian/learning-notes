import { NextApiRequest, NextApiResponse } from "next";
import { TodoItem } from "../index";
type Data = TodoItem[];

const todoItems: TodoItem[] = [
  {
    content: 'test',
    checked: false,
  },
  {
    content: 'test',
    checked: false,
  },
  {
    content: 'test',
    checked: false,
  },
];

export default function getTodoItems(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json(todoItems);
}