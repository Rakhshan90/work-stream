import TaskList from "@/components/task-list";


export default function Page({ params }: { params: { slug: string } }) {

  return (
    <div className="m-4 flex-1">
      <TaskList id={Number(params.slug)} />
    </div>
  )
}