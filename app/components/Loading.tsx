const Loading = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f8f9fa",
            }}
        >
            <p style={{ fontSize: "20px", color: "#555" }}>
                Loading...
            </p>
        </div>
    );
};

export default Loading;

/*
import Image from "next/image";
const Loading = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column", // Stack items vertically
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Full viewport height
                backgroundColor: "#f8f9fa", // Optional background color
            }}
            >
            <Image
                src="/assets/logo.png" 
                alt="Loading..."
                width={500}
                height={250}
            />
            <p style={{ marginTop: "16px", fontSize: "20px", color: "#555" }}>
                Loading...
            </p>
        </div>
    )
};

export default Loading;
*/