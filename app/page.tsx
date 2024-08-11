import Chat from "@/app/components/Chat";

const Home: React.FC = () => {
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Chat/>
    </div>
  )
};

export default Home;