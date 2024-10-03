export default function Page({ params }: { params: { slug: string } }) {
    return <div className="text-white">My Post: {params.slug}</div>
  }