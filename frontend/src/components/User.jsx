import services from "../services";

export default function User() {
    let users = [];
    services.user.getAll().then((resp) => {
        console.log(resp.data);
        users = resp.data;
    });

    return(
        <div>
            {users}
        </div>
    );
}