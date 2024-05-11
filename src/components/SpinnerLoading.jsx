import { Spinner } from "flowbite-react";

export function SpinnerLoading() {
    return (
        <div className="flex flex-row gap-3">
            <div color="gray">
                <Spinner
                    aria-label="Alternate spinner button example"
                    size="xxl"
                />
                <span className="pl-3">Loading...</span>
            </div>
        </div>
    );
}

export default SpinnerLoading;
