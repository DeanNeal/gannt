<div class="container-fluid"> 

	<section class="panel list">
		<div class="table-controls-wrapper table-wrapper hide_adv_sett hidden_sett" data-alias="kfinance.transaction">
		<header class="panel-heading">
		<div class="pull-left"> Transactions</div>


		<div class="pull-right group-left-controls">

		<i class="tpc_head__btns-gbtn filters_switcher" data-title="Filters"></i>                
		<a href="#" class="tpc_head__btns-export" data-title="To Excel">Export</a>
		</div>
		</header>
  
		<div class="filters_controller">
			<span class="comp_data" data-name="eq" data-label="Equal"></span>
			<span class="comp_data" data-name="gt" data-label="Greater"></span>
			<span class="comp_data" data-name="lt" data-label="Less"></span>
			<span class="comp_data" data-name="like" data-label="Like"></span>
			<span class="comp_data" data-name="between" data-label="Between"></span>
			<span class="comp_data" data-name="isnull" data-label="Not set"></span>

			<span class="field_data" data-name="name" data-label="Transaction" data-type="text" data-sortable="1" data-searchable="1" data-isrelated=""></span>
			<span class="field_data" data-name="date" data-label="Date" data-type="date" data-sortable="1" data-searchable="1" data-isrelated=""></span>
			<span class="field_data" data-name="amount" data-label="Amount" data-type="text" data-class="floatPositive" data-sortable="1" data-searchable="1" data-width="150px" data-isrelated=""></span>
			<span class="field_data" data-name="description" data-label="Description" data-type="text" data-searchable="1" data-isrelated=""></span>
			<span class="field_data" data-name="transactionreasonacnt.name" data-label="Purporse" data-sortable="1" data-searchable="1" data-isrelated="1" data-relationalias="transactionreasonacnt" data-destmodelalias="kfinance.reasonacnt"></span>
			<span class="field_data" data-name="transactioncounterpartyacnt.name" data-label="Payment from/to" data-sortable="1" data-searchable="1" data-isrelated="1" data-relationalias="transactioncounterpartyacnt" data-destmodelalias="kfinance.counterpartyacnt"></span>
			<span class="field_data" data-name="transactionfinacntdebit.name" data-label="Debit" data-sortable="1" data-searchable="1" data-isrelated="1" data-relationalias="transactionfinacntdebit" data-destmodelalias="kfinance.finacnt"></span>
			<span class="field_data" data-name="transactionfinacntcredit.name" data-label="Credit" data-sortable="1" data-searchable="1" data-isrelated="1" data-relationalias="transactionfinacntcredit" data-destmodelalias="kfinance.finacnt"></span>
			<span class="field_data" data-name="transactioncashflowacnt.name" data-label="Cashflow" data-sortable="1" data-searchable="1" data-isrelated="1" data-relationalias="transactioncashflowacnt" data-destmodelalias="kfinance.cashflowacnt"></span>
		</div>    
		</div>
	</section>
	
</div>