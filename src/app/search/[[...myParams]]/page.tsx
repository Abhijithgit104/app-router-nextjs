interface SearchProps {
    params: Promise<{ myParams?: string[] }>;
}

export default async function DynamicSearch({ params }: SearchProps){
    const { myParams = [] } = await params;
    
    const category = myParams[0] || 'All';
    const group = myParams[1];
    const brand = myParams[2];
    const modelNo = myParams[3];

    return (
        <div>
            <h1>Search Results</h1>
            <p>Category: {category}</p>
            {group && <p>Group: {group}</p>}
            {brand && <p>Brand: {brand}</p>}
            {modelNo && <p>Model: {modelNo}</p>}
        </div>
    );
}