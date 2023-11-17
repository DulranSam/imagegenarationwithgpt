import { useState } from "react";
import "./App.css";
import Axios from "axios";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  //const [noImages, setNoImages] = useState(1);

  async function sendImageRequest(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios.post("http://localhost:8000/main", {
        data: { image: search },
      });
      setImages(response.data);
    } catch (error) {
      console.error(error);
      setStatus(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <form onSubmit={sendImageRequest}>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search for image"
        />
        <span>Select Number of images to Generate</span>

        <img src={images.map((x) => x.url)} alt=""></img>
        <p>{status !== "" ? status : ""}</p>
        <button type="submit">
          {loading ? "Loading..." : "Generate Image"}
        </button>
      </form>
    </div>
  );
}
