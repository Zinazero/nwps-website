import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ButtonProps } from "./types";

export const Trash: React.FC<ButtonProps> = ({ onClick, className }) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className={`
                rounded-lg p-1 shadow-sm hover:scale-105 active:scale-95 transition text-red bg-white
                ${className}
                `}
		>
			<FontAwesomeIcon icon={faTrash} />
		</button>
	);
};
