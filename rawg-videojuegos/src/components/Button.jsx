import PropTypes from "prop-types";

const Button = ({ onClick, children, className }) => {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-2 bg-white text-pink-600 rounded-lg hover:bg-pink-900 hover:border-yellow-100 hover:text-yellow-100 hover:border-2 transition duration-500 ease-in-out ${className}`}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Button.defaultProps = {
    onClick: () => { },
    className: "",
};

export default Button;
