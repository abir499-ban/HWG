"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, DollarSign, ExternalLink, FileText, Search, TrendingUp, Users } from "lucide-react"
import { demoloanRequests } from '@/constants/demodata'
import { getStatusColor, formatCurrency } from '@/utils/loan_stat_functions'
import LoanViewStats from "@/components/shared/LoanViewStats"
import { useSession } from 'next-auth/react'
import { LoanViewForLenderType } from "@/utils/LoanRequest.schema"



export default function Component() {
    const { data , status} = useSession()
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [activeTab, setActiveTab] = useState("all")
    const [loanApplication, setloanApplication] = useState<LoanViewForLenderType[]>(demoloanRequests)

    const filteredRequests = demoloanRequests.filter((request) => {
        const matchesSearch =
            request.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.loanPurpose.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || request.status === statusFilter
        const matchesTab = activeTab === "all" || request.status === activeTab

        return matchesSearch && matchesStatus && matchesTab
    })

    const stats = {
        total: demoloanRequests.length,
        pending: demoloanRequests.filter((r) => r.status === "Pending").length,
        approved: demoloanRequests.filter((r) => r.status === "Approved").length,
        rejected: demoloanRequests.filter((r) => r.status === "Rejected").length,
        totalAmount: demoloanRequests.reduce((sum, r) => sum + r.loanAmount, 0),
    }

    useEffect(() => {
        const fetchLoanApplications = async () => {
            console.log(data?.aadharCard)
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/loanshark/loans/fetch/${data?.aadharCard}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${data?.accessToken}`
                    }
                })

                const response = await res.json()

                if (res?.ok && response) {
                    setloanApplication(response)
                } else {
                    console.log("Error occured")
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchLoanApplications()
    }, [status])


    const approveLoan = async(id : string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/loanshark/loans/approve/${id}`, {
               method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${data?.accessToken}`
                    }
            })
            if(res.ok){
                alert("Loan No. "+id+" approved")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const rejectLoan = async(id : string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/loanshark/loans/reject/${id}`, {
               method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${data?.accessToken}`
                    }
            })

            if(res.ok){
                alert("Loan No. "+id+" rejected")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-200 to-white p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Loan Requests</h1>
                        <p className="text-muted-foreground">Manage and review loan applications from borrowers</p>
                    </div>
                    <Button>
                        <FileText className="mr-2 h-4 w-4 " />
                        Export Report
                    </Button>
                </div>



                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <LoanViewStats stats={stats} />
                </div>




                {/* Filters and Search */}
                <Card>
                    <CardHeader>
                        <CardTitle>Loan Applications</CardTitle>
                        <CardDescription>Review and manage loan requests from borrowers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-1 items-center space-x-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, ID, or purpose..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="max-w-sm"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Under Review">Under Review</SelectItem>
                                    <SelectItem value="Approved">Approved</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="gap-2">
                        <TabsTrigger value="all">All Requests</TabsTrigger>
                        <TabsTrigger value="Pending">Pending</TabsTrigger>
                        <TabsTrigger value="Under Review">Under Review</TabsTrigger>
                        <TabsTrigger value="Approved">Approved</TabsTrigger>
                        <TabsTrigger value="Rejected">Rejected</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="space-y-4">
                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Request ID</TableHead>
                                            <TableHead>Farmer</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Purpose</TableHead>
                                            <TableHead>Loan term (months)</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date Applied</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredRequests.map((request) => (
                                            <TableRow key={request.id}>
                                                <TableCell className="font-medium">{request.id}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{request.farmerName}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">{formatCurrency(request.loanAmount)}</TableCell>
                                                <TableCell>{request.loanPurpose}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2 py-1 text-xm font-medium`}
                                                        >
                                                            {request.loanTermMonth}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(request.status)}>
                                                        {request.status.replace("_", " ").toUpperCase()}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{new Date(request.dateApplied).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm" className="hover:cursor-pointer">
                                                            <ExternalLink/>
                                                            View
                                                        </Button>
                                                        {request.status === "Pending" && (
                                                            <>
                                                                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 hover:cursor-pointer"
                                                                onClick={()=>approveLoan(request.id)}>
                                                                    Approve
                                                                </Button>
                                                                <Button variant="destructive" size="sm" className="hover:cursor-pointer"
                                                                onClick={()=>rejectLoan(request.id)}>
                                                                    Reject
                                                                </Button>
                                                            </>
                                                        )}
                                                        {request.status === "Under Review" && (
                                                            <Button variant="default" size="sm" className="hover:cursor-pointer">
                                                                <ExternalLink/>
                                                                Review
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {filteredRequests.length === 0 && (
                                    <div className="flex h-24 items-center justify-center text-muted-foreground">
                                        No loan requests found matching your criteria.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
