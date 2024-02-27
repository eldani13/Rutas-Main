interface ViewOnlyGetComponentProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export function ViewOnlyGetComponent({ title, description, children }: ViewOnlyGetComponentProps) {
    const renderContent = () => (
        <div className="text-black flex flex-col gap-1 xl:gap-3 w-full">
            <span className="font-bold text-lg lg:text-2xl ">{title}</span>
            <p className="text-[#bbbcbc] text-base">{description}</p>
        </div>
    );
    return (
        <div className="group cursor-pointer md:min-h-36 md:min-w-100 flex justify-between items-center gap-5 ">
            <div className="flex justify-start gap-5 flex-row-reverse md:flex-row items-center w-full">
                <div className="flex bg-[#ccc] h-14 min-w-14 md:min-h-20 md:min-w-20 rounded-full items-center justify-center">
                    {children}
                </div>
                {renderContent()}
            </div>
        </div>
    )
}