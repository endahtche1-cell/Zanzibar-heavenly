import { siteConfig } from '@/config/site'

export default function BankTransferCard() {
  return (
    <div className="mt-6">
      <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Bank Transfer</p>
      <div className="mt-4 rounded-2xl border border-border bg-white px-8 py-7 shadow-sm">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Account name</span>
            <span className="text-right text-[15px] font-medium text-ink">{siteConfig.bankAccount.accountName}</span>
          </div>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Account number</span>
            <span className="font-mono text-xl font-semibold tracking-widest text-teal">{siteConfig.bankAccount.accountNumber}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
