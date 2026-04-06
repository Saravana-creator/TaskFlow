//A button component with rounded corners and a shadow animation on hover. also add scale animation on hover

export default function Button({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
        >
            {children}
        </button>
    )
}