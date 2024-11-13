


export default function Pagination({meta, showSurveys}) {
    return (<>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
            {/* Width mic */}
            <div className="flex flex-1 justify-between sm:hidden">
                <a href="#" onClick={function(e) { e.preventDefault();  showSurveys(meta.links[0].url); }} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                <a href="#" onClick={function(e) { e.preventDefault();  showSurveys(meta.links[meta.links.length - 1].url); }} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
            </div>
            {/* Width mare */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{meta.from}</span> to<span className="font-medium"> {meta.to}</span> of &nbsp;<span className="font-medium">{meta.total}</span> results
                    </p>
                </div>
                <div>
                    {meta.total > meta.per_page && 
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            {meta.links && meta.links.map(function(link, ind) {
                                return <a href="#" onClick={function(e) { e.preventDefault();  showSurveys(link.url); }} key={ind} aria-current="page" dangerouslySetInnerHTML={{ __html: link.label }}
                                className={"relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 hover:bg-gray-50" 
                                + (link.active && 'border-indigo-500 bg-indigo-100 text-indigo-600')}></a>
                            })}
                        </nav>
                    }
                </div>
            </div>
        </div>
    </>);
}