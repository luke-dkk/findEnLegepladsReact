    import { useParams, useOutletContext  } from "react-router"

      export function NotFound() {
        let params = useParams()
        return (
    <>
    404 the ressource: {params["*"]} you are looking for couldn't be found
    </>

        )
    }

      export function ShowName() {
        const { parentName } = useOutletContext();

        return (
            <>
            <p>Name: {parentName}</p>
            </>
        );
    }