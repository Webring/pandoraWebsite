import React from "react";

export const useFetching = (callback) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    const fetching = async () => {
        try {
            setLoading(true);
            await callback()
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }
    return [fetching, loading, error];

}