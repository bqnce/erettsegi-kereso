/*import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const RecentLinks = () => {
  const [recentLinks, setRecentLinks] = useState<any[]>([]);

  useEffect(() => {
    const storedLinks = localStorage.getItem("recentLinks");
    if (storedLinks) {
      setRecentLinks(JSON.parse(storedLinks));
    }
  }, []);

  const handleRowClick = (link: string | null) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <Table>
      <TableCaption>Legutóbbi keresések</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-[#070707] border-b border-[#5f5f5f]">
          <TableHead>Tantárgy</TableHead>
          <TableHead>Év</TableHead>
          <TableHead>Időszak</TableHead>
          <TableHead className="text-right">Szint</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentLinks.length > 0 ? (
          recentLinks.map((link, index) => (
            <TableRow
              key={index}
              className="hover:bg-[#0f0f0f] border-b border-[#2f2f2f] hover:cursor-pointer"
              onClick={() => handleRowClick(link.links.task || link.links.guide || link.links.audio || link.links.zip)}
            >
              <TableCell className="font-medium">{link.targy.label}</TableCell>
              <TableCell>{link.ev.label}</TableCell>
              <TableCell>{link.idoszak.label}</TableCell>
              <TableCell className="text-right">{link.szint.label}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center hover:bg-[#131313]">
              Nincs megjeleníthető adat.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RecentLinks;*/