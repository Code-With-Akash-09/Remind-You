import useMediaQuery from "@/hooks/useMediaQuery";
import { cn, getType } from "@/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/ui/drawer";

const DEFAULT_RESTRICTION = {
	min: true,
	max: true,
};

const DEFAULT_CLASS_NAMES = {
	dialog: "",
	drawer: "",
};

const DialogDrawer = ({
	children,
	containerClassNames = DEFAULT_CLASS_NAMES,
	classNames = DEFAULT_CLASS_NAMES,
	isOpen,
	close,
	title,
	description,
	restrict = DEFAULT_RESTRICTION,
	containerChildren: ContainerChildren,
}) => {
	const isMD = useMediaQuery("(min-width: 768px)");
	const restrictions = {
		min:
			getType(restrict.min) === "Boolean"
				? restrict.min
					? "min-h-[50%]"
					: ""
				: restrict.min,
		max:
			getType(restrict.max) === "Boolean"
				? restrict.max
					? "max-h-[85%]"
					: ""
				: restrict.max,
	};

	const containerClassName =
		getType(containerClassNames) === "String"
			? {
					dialog: [
						DEFAULT_CLASS_NAMES.dialog,
						containerClassNames,
					].join(" "),
					drawer: [
						DEFAULT_CLASS_NAMES.drawer,
						containerClassNames,
					].join(" "),
			  }
			: {
					...DEFAULT_CLASS_NAMES,
					...containerClassNames,
			  };

	const className =
		getType(classNames) === "String"
			? {
					dialog: [DEFAULT_CLASS_NAMES.dialog, classNames].join(" "),
					drawer: [DEFAULT_CLASS_NAMES.drawer, classNames].join(" "),
			  }
			: {
					...DEFAULT_CLASS_NAMES,
					...classNames,
			  };

	return isMD ? (
		<Dialog open={isOpen} onOpenChange={close}>
			<DialogContent
				className={cn(
					"flex flex-col gap-4 overflow-hidden sm:max-w-lg",
					restrictions.min,
					restrictions.max,
					containerClassName.dialog
				)}
				closable={!!close}
			>
				{title || description ? (
					<DialogHeader>
						{title ? <DialogTitle>{title}</DialogTitle> : null}
						{description ? (
							<DialogDescription>{description}</DialogDescription>
						) : null}
					</DialogHeader>
				) : null}
				<div
					className={cn(
						"relative flex h-full w-full flex-1 flex-col gap-4 overflow-hidden",
						className.dialog
					)}
				>
					{children}
				</div>
				{ContainerChildren && <ContainerChildren />}
			</DialogContent>
		</Dialog>
	) : (
		<Drawer open={isOpen} onOpenChange={close}>
			<DrawerContent
				className={cn(
					"flex flex-col gap-4 overflow-hidden py-4",
					restrictions.min,
					restrictions.max,
					containerClassName.drawer
				)}
			>
				{title || description ? (
					<DrawerHeader className="flex flex-col items-start gap-1 px-4 text-left">
						{title ? <DrawerTitle>{title}</DrawerTitle> : null}
						{description ? (
							<DrawerDescription>{description}</DrawerDescription>
						) : null}
					</DrawerHeader>
				) : null}
				<div
					className={cn(
						"relative flex h-full w-full flex-1 flex-col gap-4 overflow-hidden px-4",
						className.drawer
					)}
				>
					{children}
				</div>
				{ContainerChildren && <ContainerChildren />}
			</DrawerContent>
		</Drawer>
	);
};

export default DialogDrawer;
