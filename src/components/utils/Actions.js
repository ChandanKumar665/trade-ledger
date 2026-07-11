export default function Actions(props) {
    const { edit, remove, view } = props

    const Edit = () => {
        return (
            <button
                className="btn"
                disabled={edit.disabled}
                data-bs-toggle="modal"
                data-bs-target={`#${edit.modal_id}`}
                onClick={e => edit.handler(edit.params)}
            >
                <i className="bi bi-pencil-square"></i>

            </button>
        )
    }
    const View = () => {
        return (
            <button
                className="btn"
                disabled={view.disabled}
                data-bs-toggle="modal"
                data-bs-target={`#${view.modal_id}`}
                onClick={e => view.handler(view.params)}
            >
                <i className="bi bi-file-earmark-richtext-fill"></i>
            </button>
        )
    }
    const Remove = () => {
        return (
            <button
                className="btn"
                disabled={remove.disabled}
                data-bs-toggle="modal"
                data-bs-target={`#${remove.modal_id}`}
                onClick={e => remove.handler(remove.params)}
            >
                <i className="bi bi-trash3-fill"></i>
            </button>
        )
    }
    return (
        <div>
            {view && <View />}|
            {edit && <Edit />}|
            {remove && <Remove />}
        </div>
    )
}