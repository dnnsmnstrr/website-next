import { Tabs as TabsPrimitive } from "bits-ui";
import Content from "./tabs-content.svelte";
import List from "./tabs-list.svelte";
import Link from "./tabs-link.svelte";
import Trigger from "./tabs-trigger.svelte";

const Root = TabsPrimitive.Root;

export {
	Root,
	Content,
	List,
	Link,
	Trigger,
	//
	Root as Tabs,
	Content as TabsContent,
	List as TabsList,
	Link as TabsLink,
	Trigger as TabsTrigger,
};
