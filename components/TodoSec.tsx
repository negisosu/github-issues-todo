"use client"

import { Comment } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { parseMarkdownToChecklist } from "@/lib/parses";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { useDebouncedCallback } from 'use-debounce';
import { AlignJustify, Ellipsis, Plus, Trash2 } from "lucide-react";
import { Reorder } from "framer-motion"
import { AutosizeTextarea } from "./AutosizeTextarea";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";


export function TodoSec({ comment }: { comment: Comment }) {

    // ドラッグハンドル用ref
    const handleRefs = useRef<(SVGSVGElement | null)[]>([]);

    useEffect(() => {
        const touchHandler = (e: Event) => e.preventDefault();
        const elements = [...handleRefs.current];
        elements.forEach((el) => {
            if (el) el.addEventListener("touchstart", touchHandler, { passive: false });
        });
        return () => {
            elements.forEach((el) => {
                if (el) el.removeEventListener("touchstart", touchHandler);
            });
        };
    }, []);

    const parsed = parseMarkdownToChecklist(comment.body || "")

    const [todos, setTodos] = useState(parsed)
    const [keep, setKeep] = useState<"最新の状態です" | "保存中...">("最新の状態です")

    const debounced = useDebouncedCallback(async () => {
        await fetch("/api/comment", {
            method: "PATCH",
            body: JSON.stringify({
                todos: todos,
                url: comment.url
            })
        })
        setKeep("最新の状態です")
    }, 2000)

    const isFirstRender = useRef<boolean[]>([true, true])

    useEffect(() => {
        if (isFirstRender.current[0]) {
            isFirstRender.current[0] = false
            return // 初回の実行をスキップ
          }
      
        debounced()
    },[todos, debounced])

    useEffect(() => {
        if (isFirstRender.current[1]) {
            isFirstRender.current[1] = false
            return // 初回の実行をスキップ
          }
      
        setKeep("保存中...")
    }, [todos, comment])

    useEffect(() => {
        if(!todos){

        }
    },[todos])

    if(todos.length == 0){
        return(
            <div className="w-full flex items-center">
                {
                    keep == "保存中..." ? "削除中" : "削除しました"
                }
            </div>
        )
    }

    return(
        <Card className="max-w-3xl">
            <CardHeader>
                <div className="flex justify-between">
                    <CardDescription>
                        {keep }
                    </CardDescription>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Ellipsis className="w-8 aspect-square cursor-pointer"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <button onClick={() => setTodos([])} className="text-red-500">
                                        グループを削除
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className=" overflow-auto">
            <Table className=" table-fixed">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-6 "></TableHead>
                        <TableHead className="w-6 sm:w-14"></TableHead>
                        <TableHead>TODO</TableHead>
                        <TableHead className="w-10 text-center">削除</TableHead>
                    </TableRow>
                </TableHeader>
                <Reorder.Group
                as="tbody"
                axis="y"
                values={todos}
                onReorder={setTodos}
                >
                    {todos.map((todo, i) => (
                        <Reorder.Item
                        as="tr"
                        key={todo.id}
                        value={todo}
                        // trへのrefは不要
                        >
                                <TableCell>
                                    <AlignJustify className="w-4 aspect-square sm:w-auto cursor-pointer" ref={el => { handleRefs.current[i] = el; }} />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Checkbox
                                    checked={todo.checked}
                                    onCheckedChange={() => {
                                        const todosCopy = todos.slice()
                                        todosCopy[i].checked = !todos[i].checked
                                        setTodos(todosCopy)
                                    }}
                                    />
                                </TableCell>
                                <TableCell className=" break-words whitespace-break-spaces">
                                    <AutosizeTextarea
                                    value={todo.text}
                                    onChange={(e) => {
                                        const todosCopy = todos.slice()
                                        todosCopy[i].text = e.target.value
                                        setTodos(todosCopy)
                                    }}
                                    className="h-10 border-0"
                                    minHeight={12}
                                    />
                                </TableCell>
                                <TableCell className=" mx-auto">
                                    <Trash2 className="w-5 aspect-square text-red-500 hover:text-red-400 sm:w-auto cursor-pointer" onClick={() => {
                                        setTodos(todos.filter(to => to.id !== todo.id))
                                    }}/>
                                </TableCell>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </Table>
            <Button
            className="w-full flex"
            variant="outline"
            onClick={() => {
                setTodos([
                    ...todos,
                    {
                        id: Date.now(), // number型の一意なID
                        checked: false,
                        text: ""
                    }
                ])
            }}
            >
                <Plus/>
                タスクを追加
            </Button>
            </CardContent>
        </Card>
    )
}