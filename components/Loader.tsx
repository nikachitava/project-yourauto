import React from "react";

interface ILoader {
    text: string;
}

const Loader: React.FC<ILoader> = ({ text }) => {
    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">{text}</p>
            </div>
        </div>
    );
};

export default Loader;
