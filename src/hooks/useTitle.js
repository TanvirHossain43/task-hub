import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `Task Hub | ${title}`;
    }, [title])
}
export default useTitle;