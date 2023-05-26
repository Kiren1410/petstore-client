export default function Success() {
    return (
      <div>
        <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
				<span className="sr-only">Success</span>
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">You Have Succesfully Completed This Purchase!</p>
			<button className="bg-accent py-5 my-5"><a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to Shopping</a></button>
		</div>
	</div>
</section>
      </div>
    );
  }
  