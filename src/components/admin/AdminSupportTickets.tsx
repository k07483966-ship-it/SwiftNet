'use client';
import { useState } from 'react';
import { Ticket, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function AdminSupportTickets() {
  const [tickets, setTickets] = useState([
    { id: '#TK-4029', user: 'Selikem Junior (KTech)', subject: 'MTN 10GB Data Delay on 0244123456', priority: 'High', status: 'Pending', date: '2026-09-06 09:10' },
    { id: '#TK-4028', user: 'Kofi DataHub', subject: 'MoMo Deposit Auto-Validation issue', priority: 'Medium', status: 'Open', date: '2026-09-06 08:42' },
    { id: '#TK-4027', user: 'Ama Bundles', subject: 'Storefront Subdomain SSL Configuration', priority: 'Low', status: 'Resolved', date: '2026-09-05 17:15' },
    { id: '#TK-4026', user: 'Yaw SME Hub', subject: 'BECE Checker PIN API Integration Query', priority: 'High', status: 'Resolved', date: '2026-09-05 14:00' },
  ]);

  const [activeTicket, setActiveTicket] = useState<typeof tickets[0] | null>(null);
  const [reply, setReply] = useState('');

  const handleSendReply = () => {
    if (!activeTicket || !reply.trim()) return;
    setTickets(tickets.map(t => t.id === activeTicket.id ? { ...t, status: 'Resolved' } : t));
    setReply('');
    setActiveTicket(null);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <h2 className="text-lg font-bold text-slate-800 font-display">Support Tickets & Customer Desk</h2>
        <p className="text-xs text-slate-500 mt-0.5">Manage agent support requests, order inquiries, and resolution logs</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10.5px]">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{t.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{t.user}</td>
                  <td className="py-3.5 px-4 text-slate-700">{t.subject}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      t.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700 animate-pulse'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveTicket(t)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs cursor-pointer"
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeTicket && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-[480px] p-5 shadow-2xl space-y-4 text-slate-800">
            <h3 className="font-bold text-base text-slate-900">Reply to {activeTicket.id}</h3>
            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              {activeTicket.subject}
            </p>

            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type official admin response..."
              rows={4}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveTicket(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={handleSendReply}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700"
              >
                Send Response & Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
