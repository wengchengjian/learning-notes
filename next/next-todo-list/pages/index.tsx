import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { Row, Col, Input, Divider, Switch } from 'antd';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
export interface TodoItem {
  content: string;
  checked: boolean;
}
interface IProps {
  todoItems?: TodoItem[];
  children?: React.ReactNode;
}
const Home: NextPage = (props: IProps) => {
  const input = useRef(null);

  const [undos, setUndos] = useState<TodoItem[]>(() => props.todoItems || []);
  const [done, setDone] = useState<TodoItem[]>([]);

  const onSwitchChange = useCallback(
    (value: boolean, index: number, deleted: TodoItem[], add: TodoItem[]) => {
      const temp = deleted[index];
      console.log(deleted, add);

      temp.checked = value;
      deleted.splice(index, 1);
      add.push(temp);
      if (value) {
        setUndos([...deleted]);
        setDone([...add]);
      } else {
        setUndos([...add]);
        setDone([...deleted]);
      }
    },
    []
  );
  const handleInputEnter = useCallback((e: any) => {
    console.log(undos.length);

    const item: TodoItem = {
      content: e.target.defaultValue,
      checked: false,
    };
    undos.push(item);
    setUndos([...undos]);
  }, []);
  return (
    <div className={styles.todos}>
      <Row justify="center" gutter={16} className={styles.todosBox}>
        <Col>
          <Row>
            <Input
              ref={input}
              placeholder="请输入todo"
              onPressEnter={(e) => handleInputEnter(e)}
            />
          </Row>
          <Divider>未完成</Divider>
          {undos.map((item, index) => {
            return (
              <Row key={item.content + index} justify="space-between">
                <Link href={`/${item.content}`}>
                  <a>
                    <Col>{item.content}</Col>
                  </a>
                </Link>
                <Col>
                  <Switch
                    defaultChecked={item.checked}
                    onChange={(value) => {
                      onSwitchChange(value, index, undos, done);
                    }}
                  />
                </Col>
              </Row>
            );
          })}
          <Divider>已完成</Divider>
          {done.map((item, index) => {
            return (
              <Row
                key={item.content + index}
                justify="space-between"
                gutter={16}
              >
                <Link href={`/${item.content}`}>
                  <a>
                    <Col>{item.content}</Col>
                  </a>
                </Link>
                <Col>
                  <Switch
                    defaultChecked={item.checked}
                    onChange={(value) => {
                      onSwitchChange(value, index, done, undos);
                    }}
                  />
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const todoItems: TodoItem[] = [
    {
      content: 'test1',
      checked: false,
    },
    {
      content: 'test2',
      checked: false,
    },
    {
      content: 'test3',
      checked: false,
    },
  ];
  return {
    props: { todoItems },
  };
}
