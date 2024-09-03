import bg from '../../assets/images/nature.jpg'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-cover" style={{backgroundImage: `url(${bg.src})`, width: '100%',height: '100%'}}>
      <div>
        New App Backend
      </div>
    </main>
  );
}
