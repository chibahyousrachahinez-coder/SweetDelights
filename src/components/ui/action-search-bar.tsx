"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Send,
    Cake,
    Gift,
    PartyPopper,
    ShoppingBag,
    Heart,
} from "lucide-react";

function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export interface Action {
    id: string;
    label: string;
    icon: React.ReactNode;
    description?: string;
    short?: string;
    end?: string;
}

interface SearchResult {
    actions: Action[];
}

const defaultBakeryActions: Action[] = [
    {
        id: "1",
        label: "Birthday Cakes",
        icon: <Cake className="h-4 w-4 text-pink-500" />,
        description: "Celebration",
        short: "",
        end: "Popular",
    },
    {
        id: "2",
        label: "Wedding Cakes",
        icon: <Heart className="h-4 w-4 text-rose-500" />,
        description: "Custom Order",
        short: "",
        end: "Premium",
    },
    {
        id: "3",
        label: "Cupcakes",
        icon: <Gift className="h-4 w-4 text-amber-500" />,
        description: "Fresh Daily",
        short: "",
        end: "Treats",
    },
    {
        id: "4",
        label: "Party Packages",
        icon: <PartyPopper className="h-4 w-4 text-purple-500" />,
        description: "Events",
        short: "",
        end: "Bundle",
    },
    {
        id: "5",
        label: "Gift Boxes",
        icon: <ShoppingBag className="h-4 w-4 text-green-500" />,
        description: "Special",
        short: "",
        end: "Gift",
    },
];

function ActionSearchBar({ actions = defaultBakeryActions }: { actions?: Action[] }) {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<SearchResult | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Action | null>(null);
    const debouncedQuery = useDebounce(query, 200);

    useEffect(() => {
        if (!isFocused) {
            setResult(null);
            return;
        }

        if (!debouncedQuery) {
            setResult({ actions: actions });
            return;
        }

        const normalizedQuery = debouncedQuery.toLowerCase().trim();
        const filteredActions = actions.filter((action) => {
            const searchableText = action.label.toLowerCase();
            return searchableText.includes(normalizedQuery);
        });

        setResult({ actions: filteredActions });
    }, [debouncedQuery, isFocused, actions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const container = {
        hidden: { opacity: 0, height: 0 },
        show: {
            opacity: 1,
            height: "auto",
            transition: {
                height: {
                    duration: 0.4,
                },
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                height: {
                    duration: 0.3,
                },
                opacity: {
                    duration: 0.2,
                },
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2,
            },
        },
    };

    const handleFocus = () => {
        setSelectedAction(null);
        setIsFocused(true);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative flex flex-col justify-start items-center">
                <div className="w-full sticky top-0 bg-transparent z-10">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search cakes, cupcakes..."
                            value={query}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={() =>
                                setTimeout(() => setIsFocused(false), 200)
                            }
                            className="pl-4 pr-10 py-2.5 h-11 text-sm rounded-full border-pink-200 focus:border-pink-400 focus-visible:ring-pink-200 bg-white/90 backdrop-blur-sm shadow-sm"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4">
                            <AnimatePresence mode="popLayout">
                                {query.length > 0 ? (
                                    <motion.div
                                        key="send"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Send className="w-4 h-4 text-pink-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="search"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Search className="w-4 h-4 text-pink-400" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="w-full absolute top-full mt-2">
                    <AnimatePresence>
                        {isFocused && result && !selectedAction && (
                            <motion.div
                                className="w-full border border-pink-100 rounded-2xl shadow-lg overflow-hidden bg-white"
                                variants={container}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                <motion.ul className="py-2">
                                    {result.actions.map((action) => (
                                        <motion.li
                                            key={action.id}
                                            className="px-4 py-2.5 flex items-center justify-between hover:bg-pink-50 cursor-pointer"
                                            variants={item}
                                            layout
                                            onClick={() =>
                                                setSelectedAction(action)
                                            }
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="p-1.5 rounded-full bg-pink-50">
                                                    {action.icon}
                                                </span>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {action.label}
                                                    </span>
                                                    <span className="text-xs text-gray-400 ml-2">
                                                        {action.description}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-600">
                                                {action.end}
                                            </span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                                {result.actions.length === 0 && (
                                    <div className="px-4 py-6 text-center text-gray-400">
                                        No results found
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export { ActionSearchBar, defaultBakeryActions };
