export default function Table({ data }) {
  return (
    <table className="w-[500px]">
      <caption>{data.city.name} Weather</caption>
      <thead>
        <tr className="text-left" scope="col">
          <th>Time</th>
          <th>Temperature</th>
          <th>Weather</th>
        </tr>
      </thead>
      <tbody>
        {data.list.map((e, i) => (
          <tr key={i} className="border-b-2 border-black">
            <td>{e.dt_txt.slice(0, -3)}</td>
            <td>{e.main.temp}</td>
            <td>{e.weather[0].main}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
