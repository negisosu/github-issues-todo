'use client'

import { Repos } from "@/lib/types"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useState } from "react"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { cn } from "@/lib/utils"
import clsx from "clsx"

export function SelectRepositories({ repos, setRepoValue }: { repos: Repos, setRepoValue: React.Dispatch<React.SetStateAction<string>> }) {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [owner, setOwner] = useState("")

    return(
        <Popover open={open} onOpenChange={setOpen}>
                <input
                type="hidden"
                value={value}
                name="repo"
                />
                <input
                type="hidden"
                value={owner}
                name="owner"
                />
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
                >
                {value
                    ? repos.find((repo) => repo.name === value)?.name
                    : "リポジトリを選択..."}
                <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                <CommandInput placeholder="リポジトリを探す" className="h-9" />
                <CommandItem disabled>
                    <div className="w-full grid grid-cols-4 text-xs text-center">
                        <div className=" col-span-3">リポジトリ名</div>
                        <div className=" col-span-1">状態</div>
                    </div>
                    <Check className=" opacity-0"/>
                </CommandItem>
                <CommandList>
                    <CommandEmpty>リポジトリが見つかりません。</CommandEmpty>
                    <CommandGroup>
                        {
                            repos.map((repo) => (
                                <CommandItem
                                key={repo.id}
                                value={repo.name}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setRepoValue(currentValue === value ? "" : currentValue)
                                    setOwner(repos.find((repo) => currentValue === repo.name)?.owner.login || "")
                                    setOpen(false)
                                }}
                                >
                                    <div className="w-full grid grid-cols-4 text-xs text-center">
                                        <div className=" col-span-3">{repo.name}</div>
                                        <div className={clsx(
                                            "col-span-1",
                                            repo.visibility == "private" && "text-neutral-300"
                                        )}>{repo.visibility}</div>
                                    </div>
                                    <Check
                                    className={cn(
                                    "ml-auto",
                                    value === repo.name ? "opacity-100" : "opacity-0"
                                    )}
                                    />
                                </CommandItem>
                            ))
                        }
                    </CommandGroup>
                </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}